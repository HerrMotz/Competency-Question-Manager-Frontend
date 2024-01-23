type CompetencyQuestionT = {
    id: String,
    group_id: String,
    question: String,
    rating: Number,
    ratings?: Array<RatingT>,
    author_id: String,
    author_name: String
}

type CompetencyQuestionReducedT = {
    id: String,
    group_id: String,
    question: String,
    author_id: String,
    author_name: String,
    rating: Number
}

type CompetencyQuestionConsolidationT = {
    id: String,
    author: UserReducedT
}