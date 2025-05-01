import { TableCell } from "../../../../shared/ui"
import React from "react"
import { Post } from "../../../../entities/posts/model/types.ts"
import { useUsersStore } from "../../../user/model/usersStore.ts"
import { useUserDialogStore } from "../../../user/model/userDialogStore.ts"
import { useUserQuery } from "../../../user/api/queries.ts"

interface UserModalCellProps {
  post: Post
}

export const UserModalCell: React.FC<UserModalCellProps> = ({ post }) => {
  const { setSelectedUser } = useUsersStore()
  const { setShowUserDialog } = useUserDialogStore()

  const {
    refetch,
    isFetching,
  } = useUserQuery(post.author?.id as number, {
    enabled: false,
  })

  const openUserModal = async () => {
    if (isFetching) return
    const { data } = await refetch()
    if (!data) return

    setSelectedUser(data)
    setShowUserDialog(true)
  }

  return (
    <TableCell>
      <div className="flex items-center space-x-2 cursor-pointer" onClick={openUserModal}>
        <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
        <span>{post.author?.username}</span>
      </div>
    </TableCell>
  )
}
