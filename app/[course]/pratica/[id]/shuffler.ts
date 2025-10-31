export default function shuffle(array:unknown[]) {
  const newArray = [...array];
  let i = array.length;

  while (i != 0) {

    const randomIndex = Math.floor(Math.random() * i);
    i--;

    //troca o newArray[i](ultimo indice de newArray) pelo newArray[randomIndex](indice aleatorio de newArray)
    //e sinultaneamente troca o newArray[randomIndex] por newArray[i]
    [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]];
  }
  return newArray;
}