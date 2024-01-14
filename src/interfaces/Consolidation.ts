type ConsolidationT = {
    id: string,
    name: string,
    engineer: {
        email: string,
        name: string,
        id: string
    },
    questions: CompetencyQuestionReducedT[]
}