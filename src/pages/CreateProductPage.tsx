import Header from "../Components/Header.tsx";
import SongAdd from "../Components/SongAdd.tsx";
import Footer from "../Components/Footer.tsx";

const CreateProductPage = () => {
    const isAdd = true;

    return (
        <>
            <Header isAdd={isAdd}/>
            <SongAdd />
            <Footer />
        </>
    )
}

export default CreateProductPage;