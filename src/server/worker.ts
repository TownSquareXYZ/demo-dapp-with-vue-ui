import {http} from 'msw'
import {setupWorker} from 'msw/browser'
import {checkProof} from "./api/check-proof";
import {createJetton} from "./api/create-jetton";
import {generatePayload} from "./api/generate-payload";
import {getAccountInfo} from "./api/get-account-info";

const baseUrl = document.baseURI.replace(/\/$/, '');

export const worker = setupWorker(
  http.post(`${baseUrl}/api/generate_payload`, generatePayload),
  http.post(`${baseUrl}/api/check_proof`, checkProof),
  http.get(`${baseUrl}/api/get_account_info`, getAccountInfo),
  http.post(`${baseUrl}/api/create_jetton`, createJetton),
)
