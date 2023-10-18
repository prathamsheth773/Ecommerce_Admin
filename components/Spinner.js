import { BounceLoader } from "react-spinners";

export default function Spinner(){
    return(
        <BounceLoader color="Red" speedMultiplier={2}></BounceLoader>
    );
}