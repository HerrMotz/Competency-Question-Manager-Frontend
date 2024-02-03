type AnnotationT = {
    passage: string,
    term: string,
}

type AnnotationInCQT = {
    content: string,
    term: {
        content: string,
        id: string // this is the term id
    },
    id: string // this is the passage id
}