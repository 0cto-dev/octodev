export default async function getLesson(course:string,id:string):Promise<exType>{
        const data = await import(`@/data/${course}/pratic/lessons.json`)
        const exerciseData = data.default.find((ex:exType)=>ex.id == id);
    return exerciseData
}
type exType =   {
    id: string,
    titulo: string,
    descricao: string,
    exercicios: []
  }