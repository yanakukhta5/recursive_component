export interface IBranch {
 id: number,
 title: String,
 url: String,
 count: Number,
}

export interface IBranchParent extends IBranch{
 children?: IBranch[]
}