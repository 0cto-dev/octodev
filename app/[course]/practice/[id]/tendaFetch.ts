import { tendaOutputType } from "@/types/types";

export const runTenda = async (code:string) => {
    try {
      const res = await fetch('/api/tenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      let output = data.output.split('\n')
      
      output = JSON.parse(`[${output.join(',')}]`)

      const outputs = output.map((linha:tendaOutputType)=>{
        return linha
      })
      
      if (data.error) {
        return (`Erro: ${data.error}`);
      } else {
        return (outputs);
      }
    } catch (err: unknown) {
      return(`Erro ao chamar a API: ${err instanceof Error ? err.message : String(err)}`);
    }
  };