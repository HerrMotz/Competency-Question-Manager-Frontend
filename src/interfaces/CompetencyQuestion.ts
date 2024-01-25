type CompetencyQuestionT = {
    id: String,
    groupId: String,
    question: String,
    aggregatedRating: Number,
    ratings?: Array<RatingT>,
    author: UserT,
    noConsolidations: Number
}

type CompetencyQuestionReducedT = {
    id: String,
    groupId: String,
    question: String,
    author: UserReducedT,
    aggregatedRating: Number
}

type CompetencyQuestionConsolidationT = {
    id: String,
    author: UserReducedT
}