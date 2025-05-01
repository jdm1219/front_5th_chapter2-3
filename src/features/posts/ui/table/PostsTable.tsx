import React from "react"

import { Table, TableHeader, TableRow, TableHead, TableBody } from "../../../../shared/ui"
import { usePostsStore } from "../../model/postsStore.ts"
import { PostsTableRow } from "./PostsTableRow.tsx"

export const PostsTable: React.FC = () => {
  const posts = usePostsStore((state) => state.posts)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <PostsTableRow key={post.id} post={post} />
        ))}
      </TableBody>
    </Table>
  )
}
