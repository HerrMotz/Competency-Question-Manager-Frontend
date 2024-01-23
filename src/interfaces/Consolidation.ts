type ConsolidationT = {
    id: string,
    name: string,
    project: ProjectReducedT,
    engineer: {
        email: string,
        name: string,
        id: string
    },
    questions: CompetencyQuestionReducedT[],
    noQuestions: 0
}