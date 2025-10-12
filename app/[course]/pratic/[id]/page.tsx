import getLesson from '@/lib/getLesson';

type HomeProps = {
    params: {
        course: string,
        id: string
    }
}

export default async function Home({ params }: HomeProps) {
    const { course, id } = await params;
    let error = false;
    if (!course || !id) error = true

    const data = await getLesson(course, id);

    if (!data?.id) error = true

    console.log()
    return (
        <main>
        {error? 
            <>
                <Error/>
            </>:
            <>
                <h1>{data.titulo}</h1>
                <p>{data.descricao}</p>
            </>
        }

        </main>
    );
}

function Error(){
    return(
        <h1>ERRO, A PAGINA NÃO PODE SER RENDERIZADA</h1>
    )
}