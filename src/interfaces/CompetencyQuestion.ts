type CompetencyQuestionT = {
    id: String,
    groupId: String,
    question: String,
    aggregatedRating: Number,
    ratings?: Array<RatingT>,
    author: UserT,
    noConsolidations: Number,
    annotations: Array<AnnotationT>,
    versions: {
        editor: {
            name: string,
            id: string,
        },
        questionString: string,
        versionNumber: Number
    },
    group: GroupT,
}

type CompetencyQuestionReducedT = {
    id: String,
    group: {
        id: string,
        name: string
    },
    question: String,
    author: UserReducedT,
    aggregatedRating: Number
}

type CompetencyQuestionReferenceT = {
    id: string,
    author: UserReducedT
    group: {
        id: string,
        name: string
    },
    question: string
}