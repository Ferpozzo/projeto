interface Objects {
    type: string,
    backgroundColor: string[],
    borderColor: string[],
    borderWidth: number
}
export interface ChartModel {
    _id: string,
    Objects: Objects[]

}