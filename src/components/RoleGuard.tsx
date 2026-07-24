export default function RoleGuard({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  // ユーザーの権限を取得し、許可リストに含まれている場合のみレンダリングする
  // 含まれていない場合は「権限がありません」を表示する
}