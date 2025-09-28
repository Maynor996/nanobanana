#!/bin/bash

echo "=== AI图像生成应用性能测试 ==="
echo "开始时间: $(date)"
echo ""

# 测试配置
BASE_URL="http://localhost:3000"
CONCURRENT_TESTS=5
TEST_DURATION=60  # 60秒测试

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 测试计数器
declare -A test_results
test_results[success]=0
test_results[failure]=0
test_results[timeout]=0

# 记录响应时间
response_times=()

# 记录测试结果的函数
log_result() {
    local status=$1
    local response_time=$2
    local endpoint=$3
    
    if [ "$status" = "200" ] || [ "$status" = "201" ]; then
        ((test_results[success]++))
        response_times+=($response_time)
        echo -e "${GREEN}✓${NC} $endpoint - ${status} - ${response_time}ms"
    elif [ "$status" = "timeout" ]; then
        ((test_results[timeout]++))
        echo -e "${YELLOW}⚠${NC} $endpoint - 超时"
    else
        ((test_results[failure]++))
        echo -e "${RED}✗${NC} $endpoint - ${status} - ${response_time}ms"
    fi
}

# 测试API端点的函数
test_api_endpoint() {
    local endpoint=$1
    local method=$2
    local data=$3
    local timeout=${4:-30}
    
    echo -e "${BLUE}[INFO]${NC} 测试: $method $endpoint"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "%{http_code}|%{time_total}" -m $timeout "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "%{http_code}|%{time_total}" -m $timeout \
            -X $method \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$BASE_URL$endpoint")
    fi
    
    if [ $? -eq 28 ]; then  # curl timeout
        log_result "timeout" "0" "$endpoint"
        return
    fi
    
    http_code=$(echo $response | grep -o '[0-9]*|[0-9.]*$' | cut -d'|' -f1)
    time_total=$(echo $response | grep -o '[0-9]*|[0-9.]*$' | cut -d'|' -f2)
    time_ms=$(echo "$time_total * 1000" | bc -l | cut -d'.' -f1)
    
    log_result "$http_code" "$time_ms" "$endpoint"
}

# 并发测试函数
run_concurrent_test() {
    local endpoint=$1
    local method=$2
    local data=$3
    local concurrent=$4
    local duration=$5
    
    echo -e "${BLUE}[INFO]${NC} 开始并发测试: $concurrent 并发用户, 持续 $duration 秒"
    echo "----------------------------------------"
    
    local end_time=$((SECONDS + duration))
    local pids=()
    
    # 启动并发测试进程
    for ((i=1; i<=concurrent; i++)); do
        (
            while [ $SECONDS -lt $end_time ]; do
                test_api_endpoint "$endpoint" "$method" "$data" 30
                sleep $(echo "scale=2; $RANDOM/32767*2+1" | bc)  # 1-3秒随机间隔
            done
        ) &
        pids+=($!)
    done
    
    # 等待所有测试完成
    for pid in "${pids[@]}"; do
        wait $pid
    done
    
    echo "----------------------------------------"
}

# 首页访问测试
echo -e "${BLUE}[TEST 1]${NC} 前端页面访问测试"
test_api_endpoint "/" "GET" "" 10
test_api_endpoint "/mvp" "GET" "" 10
test_api_endpoint "/nano" "GET" "" 10
test_api_endpoint "/pricing" "GET" "" 10
echo ""

# 认证API测试
echo -e "${BLUE}[TEST 2]${NC} 认证API测试"
test_api_endpoint "/api/auth/send-verification" "POST" '{"email":"test@example.com"}' 10
test_api_endpoint "/api/auth/verify-code" "POST" '{"email":"test@example.com","code":"123456"}' 10
echo ""

# 积分API测试
echo -e "${BLUE}[TEST 3]${NC} 积分API测试"
test_api_endpoint "/api/user/credits" "GET" "" 10
test_api_endpoint "/api/anonymous/credits" "GET" "" 10
echo ""

# AI API快速测试（不发送实际请求到外部API）
echo -e "${BLUE}[TEST 4]${NC} AI API结构测试"
test_api_endpoint "/api/generate" "POST" '{}' 5  # 空请求，测试参数验证
test_api_endpoint "/api/gemini" "POST" '{}' 5
test_api_endpoint "/api/doubao" "POST" '{}' 5
echo ""

# 并发压力测试 - 使用轻量级端点
echo -e "${BLUE}[TEST 5]${NC} 并发压力测试"
run_concurrent_test "/api/user/credits" "GET" "" $CONCURRENT_TESTS 30
echo ""

# 计算统计信息
total_tests=$((test_results[success] + test_results[failure] + test_results[timeout]))
success_rate=0
avg_response_time=0

if [ $total_tests -gt 0 ]; then
    success_rate=$(echo "scale=2; ${test_results[success]} * 100 / $total_tests" | bc -l)
fi

if [ ${#response_times[@]} -gt 0 ]; then
    sum=0
    for time in "${response_times[@]}"; do
        sum=$((sum + time))
    done
    avg_response_time=$(echo "scale=2; $sum / ${#response_times[@]}" | bc -l)
fi

# 输出测试报告
echo ""
echo "=== 性能测试报告 ==="
echo "结束时间: $(date)"
echo "----------------------------------------"
echo "总测试数: $total_tests"
echo -e "成功: ${GREEN}${test_results[success]}${NC}"
echo -e "失败: ${RED}${test_results[failure]}${NC}"
echo -e "超时: ${YELLOW}${test_results[timeout]}${NC}"
echo "成功率: ${success_rate}%"
echo "平均响应时间: ${avg_response_time}ms"
echo ""

# 性能评估
if (( $(echo "$success_rate >= 95" | bc -l) )); then
    echo -e "${GREEN}[评估] 性能表现优秀${NC}"
elif (( $(echo "$success_rate >= 85" | bc -l) )); then
    echo -e "${YELLOW}[评估] 性能表现良好${NC}"
else
    echo -e "${RED}[评估] 性能需要优化${NC}"
fi

# 性能建议
echo ""
echo "=== 性能优化建议 ==="
if (( $(echo "$avg_response_time > 1000" | bc -l) )); then
    echo "• 平均响应时间较长，建议优化API响应速度"
fi

if [ ${test_results[timeout]} -gt 0 ]; then
    echo "• 存在超时请求，建议增加超时设置或优化处理逻辑"
fi

if [ ${test_results[failure]} -gt $((total_tests / 10)) ]; then
    echo "• 错误率较高，建议检查错误处理和API稳定性"
fi

echo "• 考虑添加API响应缓存"
echo "• 考虑实现请求限流"
echo "• 监控AI API外部依赖的性能"
echo "• 优化图片处理和传输"