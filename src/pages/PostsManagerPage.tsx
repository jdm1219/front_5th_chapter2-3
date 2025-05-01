import React, { useEffect } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import { usePostsStore } from "../features/posts/model/postsStore.ts"
import { useQueryParamsStore } from "../features/posts/model/queryParamsStore.ts"
import { usePostDialogStore } from "../features/posts/model/postDialogStore.ts"
import { PostsTable } from "../features/posts/ui/table/PostsTable.tsx"
import { Pagination } from "../features/posts/ui/Pagination.tsx"
import { useSyncQueryParams } from "../features/posts/model/useSyncQueryParams.ts"
import { PostAddDialog } from "../features/posts/ui/dialogs/PostAddDialog.tsx"
import { PostEditDialog } from "../features/posts/ui/dialogs/PostEditDialog.tsx"
import { PostDetailDialog } from "../features/posts/ui/dialogs/PostDetailDialog.tsx"
import { CommentAddDialog } from "../features/comments/ui/dialogs/CommentAddDialog.tsx"
import { CommentEditDialog } from "../features/comments/ui/dialogs/CommentEditDialog.tsx"
import { UserDetailDialog } from "../features/user/ui/dialogs/UserDetailDialog.tsx"
import { SearchFilters } from "../features/posts/ui/SearchFilters.tsx"
import { usePostsByTagQuery, usePostsQuery, useSearchPostsQuery, useTagsQuery } from "../features/posts/api/queries.ts"
import { useUsersQuery } from "../features/user/api/queries.ts"
import { Post } from "../entities/posts/model/types.ts"

const PostsManager: React.FC = () => {
  useSyncQueryParams()
  const { skip, limit, sortBy, sortOrder, searchQuery, selectedTag } = useQueryParamsStore()

  const { setPosts, setTotal, setTags } = usePostsStore()
  const { setShowPostAddDialog } = usePostDialogStore()

  // 기본 게시물 쿼리
  const postsQuery = usePostsQuery(
    {
      skip,
      limit,
      sortBy,
      sortOrder,
    },
    {
      enabled: !selectedTag && !searchQuery,
    },
  )

  const tagsQuery = useTagsQuery()

  const postsByTagQuery = usePostsByTagQuery(selectedTag, {
    enabled: !!selectedTag && !searchQuery,
  })

  // 검색 쿼리
  const searchPostsQuery = useSearchPostsQuery(searchQuery, {
    enabled: !!searchQuery,
  })

  const usersQuery = useUsersQuery()

  // 사용자 데이터와 게시물 데이터 결합
  const combinePostsWithUsers = (posts: Post[]) => {
    return posts.map((post) => ({
      ...post,
      author: usersQuery.data?.users?.find((user) => user.id === post.userId),
    }))
  }

  const setPostsWithUsers = (posts: Post[]) => {
    setPosts(combinePostsWithUsers(posts))
  }

  // 태그 데이터 업데이트
  useEffect(() => {
    if (tagsQuery.data) {
      setTags(tagsQuery.data)
    }
  }, [tagsQuery.data])

  // 게시물 데이터 업데이트
  useEffect(() => {
    if (!usersQuery.data) {
      return
    }

    // 검색 결과가 있는 경우
    if (searchQuery && searchPostsQuery.data) {
      setPostsWithUsers(searchPostsQuery.data.posts)
      setTotal(searchPostsQuery.data.total)
      return
    }

    // 태그 필터링 결과가 있는 경우
    if (selectedTag && selectedTag !== "all" && postsByTagQuery.data) {
      setPostsWithUsers(postsByTagQuery.data.posts)
      setTotal(postsByTagQuery.data.total)
      return
    }

    // 기본 게시물 목록
    if (postsQuery.data) {
      setPostsWithUsers(postsQuery.data.posts)
      setTotal(postsQuery.data.total)
    }
  }, [postsQuery.data, postsByTagQuery.data, searchPostsQuery.data, selectedTag, searchQuery])

  // 로딩 상태 계산
  const isLoading =
    postsQuery.isLoading || tagsQuery.isLoading || postsByTagQuery.isLoading || searchPostsQuery.isLoading

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowPostAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <SearchFilters />
          {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostsTable />}
          <Pagination />
        </div>
      </CardContent>

      {/* 게시물 Dialog */}
      <PostAddDialog />
      <PostEditDialog />
      <PostDetailDialog />

      {/* 댓글 Dialog */}
      <CommentAddDialog />
      <CommentEditDialog />

      {/* 사용자 Dialog */}
      <UserDetailDialog />
    </Card>
  )
}

export default PostsManager
