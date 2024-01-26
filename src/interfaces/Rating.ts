type RatingT = {
    id: string, // it is a UUID, but we treat it as a string
    aggregatedRating: Number
    questionId: String
    author: UserReducedT
}