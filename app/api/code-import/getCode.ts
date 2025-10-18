import { exercisesType, lessonType } from "@/types/types";
import useSWR from "swr";

export function useCode(lesson:{course: string,id: string,data: lessonType},exerciseObj:exercisesType){
  const fetcher = (url: string) => fetch(url).then(res => res.text());
  
  const { data: code } = useSWR(`/api/code-import?course=${lesson.course}&codePath=${exerciseObj.codigo}`, fetcher);
  if(!code) return ''
  return code;
 
}
