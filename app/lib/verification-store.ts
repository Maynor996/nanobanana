// 简单的进程内验证码存储（如需多实例/持久化请改为 Redis/DB）
export type VerificationRecord = { code: string; expires: number }

// 单例 Map，用于跨路由共享
const verificationCodes = new Map<string, VerificationRecord>()

export function setVerificationCode(email: string, record: VerificationRecord) {
  verificationCodes.set(email, record)
}

export function getVerificationCode(email: string): VerificationRecord | undefined {
  return verificationCodes.get(email)
}

export function deleteVerificationCode(email: string) {
  verificationCodes.delete(email)
} 