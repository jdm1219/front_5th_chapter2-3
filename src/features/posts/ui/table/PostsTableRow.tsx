import { TableCell, TableRow } from "../../../../shared/ui"
import { Highlight } from "../../../../shared/ui/Highlight.tsx"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import React from "react"
import { Post } from "../../../../entities/posts/model/types.ts"
import { useQueryParams } from "../../model/useQueryParams.ts"
import { UserModalCell } from "./UserModalCell.tsx"
import { ActionsCell } from "./ActionsCell.tsx"

interface PostsTableRowProps {
  post: Post
}

export const PostsTableRow: React.FC<PostsTableRowProps> = ({ post }) => {
  const { searchQuery, selectedTag, setSelectedTag, updateURL } = useQueryParams()

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>
            <Highlight text={post.title} highlight={searchQuery} />
          </div>

          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                }`}
                onClick={() => {
                  setSelectedTag(tag)
                  updateURL()
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TableCell>
      <UserModalCell post={post} />
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions?.likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>
      <ActionsCell post={post} />
    </TableRow>
  )
}
