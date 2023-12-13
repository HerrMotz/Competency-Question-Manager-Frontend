type CompetencyQuestionT = {
    id: String,
    question: String,
    rating: Number,
    ratings?: Array<RatingT>,
    author_id: String,
    author_name: String
}