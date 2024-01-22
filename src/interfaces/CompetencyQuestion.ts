type CompetencyQuestionT = {
    id: string,
    question: string,
    rating: number,
    ratings?: Array<RatingT>,
    author_id: string,
    author_name: string
}