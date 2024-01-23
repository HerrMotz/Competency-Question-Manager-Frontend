type ConsolidationT = {
    id: string,
    name: string,
    project: ProjectReducedT,
    engineer: UserReducedT,
    questions: CompetencyQuestionReducedT[],
    noQuestions: 0
}