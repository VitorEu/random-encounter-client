import axios from "axios";
import { parseCookies } from "nookies";
import { getAPIClient } from "./base.apiClient";

export const api = getAPIClient();