import { Platform } from "../types";
import useData from "./useData";

const usePlatforms = () => useData<Platform>('/platforms/lists/parents');

export default usePlatforms;