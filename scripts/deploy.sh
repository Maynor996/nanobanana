#!/bin/bash

# =====================================================
# 🚀 自动部署脚本
# 用于快速部署项目到 GitHub 和 Vercel
# =====================================================

set -e  # 遇到错误立即停止

echo "🚀 开始部署流程..."

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 检查必要的工具
check_dependencies() {
    print_info "检查必要的工具..."

    if ! command -v git &> /dev/null; then
        print_error "Git 未安装，请先安装 Git"
        exit 1
    fi

    if ! command -v node &> /dev/null; then
        print_error "Node.js 未安装，请先安装 Node.js"
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        print_error "npm 未安装，请先安装 npm"
        exit 1
    fi

    print_success "所有必要的工具已安装"
}

# 检查环境变量文件
check_env_file() {
    print_info "检查环境变量配置..."

    if [ ! -f ".env.local" ]; then
        if [ -f ".env.example" ]; then
            print_warning ".env.local 文件不存在，正在从 .env.example 创建..."
            cp .env.example .env.local
            print_warning "请编辑 .env.local 文件，填入正确的环境变量值"
            print_info "编辑完成后，请重新运行此脚本"
            exit 1
        else
            print_error ".env.example 文件不存在，无法创建环境变量配置"
            exit 1
        fi
    fi

    # 检查关键环境变量
    source .env.local

    if [ -z "$GEMINI_API_KEY" ] || [ "$GEMINI_API_KEY" = "your_gemini_api_key_here" ]; then
        print_warning "请配置 GEMINI_API_KEY 环境变量"
    fi

    if [ -z "$MAYNOR_API_KEY" ] || [ "$MAYNOR_API_KEY" = "your_maynor_api_key_here" ]; then
        print_warning "请配置 MAYNOR_API_KEY 环境变量"
    fi

    print_success "环境变量文件检查完成"
}

# 安装依赖
install_dependencies() {
    print_info "安装项目依赖..."

    if [ ! -d "node_modules" ]; then
        npm install
        print_success "依赖安装完成"
    else
        print_info "依赖已存在，检查更新..."
        npm update
        print_success "依赖更新完成"
    fi
}

# 运行测试和构建
run_tests_and_build() {
    print_info "运行构建测试..."

    # 运行构建
    npm run build

    if [ $? -eq 0 ]; then
        print_success "构建成功"
    else
        print_error "构建失败，请检查代码"
        exit 1
    fi

    # 清理构建文件（可选）
    print_info "清理构建文件..."
    rm -rf .next
}

# Git 操作
git_operations() {
    print_info "执行 Git 操作..."

    # 检查是否已经初始化 Git 仓库
    if [ ! -d ".git" ]; then
        print_info "初始化 Git 仓库..."
        git init
    fi

    # 添加所有文件
    print_info "添加文件到 Git..."
    git add .

    # 提交文件
    print_info "提交文件..."
    COMMIT_MESSAGE="🚀 部署更新 - $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$COMMIT_MESSAGE" || {
        print_warning "没有新的更改需要提交"
    }

    # 检查是否有远程仓库
    if ! git remote get-url origin &> /dev/null; then
        print_warning "没有配置远程仓库 origin"
        print_info "请手动添加远程仓库："
        print_info "git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git"
        print_info "然后运行："
        print_info "git push -u origin main"
        exit 1
    fi

    # 推送到远程仓库
    print_info "推送到远程仓库..."
    git push origin main

    print_success "代码已推送到 GitHub"
}

# 显示 Vercel 部署说明
show_vercel_instructions() {
    print_success "🎉 GitHub 上传完成！"
    echo ""
    print_info "📋 接下来的 Vercel 部署步骤："
    echo ""
    echo "1. 登录 Vercel (https://vercel.com)"
    echo "2. 点击 'Add New...' → 'Project'"
    echo "3. 导入你的 GitHub 仓库"
    echo "4. 在 Vercel 项目设置中配置以下环境变量："
    echo ""
    echo "   # AI API 配置"
    echo "   GEMINI_API_KEY=your_gemini_api_key_here"
    echo "   MAYNOR_API_KEY=your_maynor_api_key_here"
    echo "   MAYNOR_API_URL=https://for.shuo.bar"
    echo ""
    echo "   # 图片上传"
    echo "   IMGBB_API_KEY=605099c929a5034c2af79747a11d0844"
    echo ""
    echo "   # Adsterra 广告配置"
    echo "   NEXT_PUBLIC_ADSTERRA_ENABLED=true"
    echo "   NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_KEY=vdsi8t1uj?key=ef0ced4cde2c993dd97e189dd4946cf5"
    echo ""
    echo "5. 点击 'Deploy'"
    echo "6. 部署完成后，访问 /ads-dashboard 检查广告配置"
    echo ""
    print_info "📖 详细说明请查看 DEPLOYMENT_GUIDE.md 文件"
}

# 主函数
main() {
    echo "🚀 自动部署脚本启动"
    echo "==============================="
    echo ""

    check_dependencies
    check_env_file
    install_dependencies
    run_tests_and_build
    git_operations
    show_vercel_instructions

    echo ""
    print_success "🎉 部署脚本执行完成！"
    echo ""
}

# 检查是否有帮助参数
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "🚀 自动部署脚本"
    echo ""
    echo "用法："
    echo "  ./deploy.sh          # 执行完整部署流程"
    echo "  ./deploy.sh --help   # 显示此帮助信息"
    echo ""
    echo "此脚本会："
    echo "1. 检查必要的工具"
    echo "2. 检查环境变量配置"
    echo "3. 安装/更新依赖"
    echo "4. 运行构建测试"
    echo "5. 提交并推送到 GitHub"
    echo "6. 显示 Vercel 部署说明"
    echo ""
    exit 0
fi

# 运行主函数
main