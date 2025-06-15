export type Book =  {
    id: string
    title: string
    author: string
    isbn: string
    category: string
    publishedDate: string
    ownerId: string  // foreign key to User
    createdAt: string
    updatedAt: string
}