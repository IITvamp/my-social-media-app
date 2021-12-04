import { makeStyles, Box, Avatar } from "@material-ui/styles";

import Header from "./Header";
import SearchBar from './SearchBar';
import Conversation from './Conversation';


const useStyles = makeStyles((theme) => ({

}));

const Menu = () => {
    return (
      <>
        <Header />
        <SearchBar />
        <Conversation />
      </>
    );
}

export default Menu;