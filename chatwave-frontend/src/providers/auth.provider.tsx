"use client";

import { AuthContext } from "@/contexts/auth.context";
import { useState } from "react";
import { User } from "@/contexts/auth.context";

export type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// {
//     "username": "319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9",
//     "pool": {
//       "userPoolId": "us-east-1_AxtMs4Hnu",
//       "clientId": "6lci33tvfndh322c9o1j4p3od7",
//       "client": {
//         "endpoint": "https://cognito-idp.us-east-1.amazonaws.com/",
//         "fetchOptions": {}
//       },
//       "advancedSecurityDataCollectionFlag": true,
//       "storage": {
//         "amplify-signin-with-hostedUI": "false",
//         "CognitoIdentityServiceProvider.6lci33tvfndh322c9o1j4p3od7.319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9.refreshToken": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.lx88ezTuzJbRYk5grB_ZxT-9QK2chCixuFv5myDIZeotg98Pe0UnXpU3xn0oSr7hKv-BPPibKA-ou6YJQQgJG2n-y5Vj8OoX5DuRPwxx7zSc2ZXrdzI4t3U7JTTYo2T7Qt6yn2V6S0rShyLLo5QfQWjeH45KIMPqSSp3Hp-klQrMuLwb-AtSmvkxBKkkKAt6_20yHOaDNlE7YYR5Fz1d-Qtrpd7JMghsSQhRaRkYOwrrXxADc8G4VevIeuMqJdHkWbnabGtfXMX_7M-N5mr2MIv2PZqlSkTrpTLi26RmQgGX_JtRsSFn3NWYy0MuqAxl4wUp0NYfRFZB_feUQoskMQ.-K2UYBCnaOJI-tBA.7wHeBX0e4IBXGd59nMDSpatTIBVUVE-kkCuPX9i7oEbyFwdYTJkA4LPv0qXFbZlQLtlGNH3CdGgJ5ENH_8OPDTTRQ7KDYK9dxvGYK56V_ESYAX-yvixtItlJ7MYnD4UKNu-S2At-Qxq9iBowV9x4alQD4CfKoxNUkuhZVd2txYZjJf55z_S5KHdhFg0iOeAOZSWFYnXeixjhMVG21bjqN4CjFF69F7OgpQ0cw9YNV_fdNTOa69O5FreWUSkiXiJ1mklIha3AqX6bQqjplAxOPY4Km5xOaF9xojwY8DtSPu_YiC0XwXUeIwd9JUQ06POE7HiF-l5hNmA0kOen_sdUMK2WDi_CrDWEXyP3W0gNP-ftjrB6AZ1_9yB-xWwqjxjflme6G_AesXHGusH-9jOjXN3mRttrXXCkQBtRwenacnhGqfwO4syJKGDKj0boCZgR-KQpcvMgF9kYP7zysgI8bCI1Usc3GnTAH3opm_fyVmgvQZjr6h9zhwJVMpmbISm2Os7XZYib-M_ac7670xu11pTUiXg-Wz3KriHaRI9f8pFv1MKAzghtjZf6QSyg_q0wDDZkRGKJYE3vX6UKpCa-ueS65P1vObIQCix-T9spvrkZU94Ndfr33PjF2AoFfp7I94l2aTNo64cdeoBR94D6WlmppuD9iMktYuDrGSsZdv981yjulvCeeBrRe0f_gvf5A0AiQwAWs7ozUb7x9Hki3oLacaAEbA1GZq8ke04MAVhCRf1D7pxbLGIJ48GeuTygZWpdb56fu-o9IUlm5YUQEnl5ZObfE76YkIv5PO3JdWChdu2vndOS1UzgJh4Pacue17ma8qC3r5Lub8Bru4g0WEu0sPP2SdTu4lWc7uKRim1PvBMMpyEY7alcYPdbfS3isDxnHfxuWe9v9Xbb5ileX6mLx5Xmxga4FqaYvaehhIWyoMLKvJfPMOsd_0SvhKF2j-80v6HolKdf-vQ3P5XhLPqudhn2v6ze0CiAxk4lLITpYPA4Tqg2PzkhypSl_IRyCTSDR5g8a0mtQx_N5jyl-Go9TksH9pKRcr-UgZuDDs2CNl8cXlTdRZ5ZUDYKXfVhxWgM7fF0BbDb9S87P-t1XYbt8dx5IfGiAFAtLXkDtsmVxUpmFp0PByOI_rfm7O8w74V8_ZHmY4eLvYvjs6e5q2F815TdcfeKrhQbGEF10ucktw8VVsm_az4x6jZKQeX_KyjvazHyRLZf8wxu_Uhce7IxVThzpz8HVQ5j53WccoQsaCrmyKdwkO9s4rOk9MCrGMgNJhHBYpeYekB2088WrvYxN0F9-FETAMoOZbw6nquMoqrB2JhsLtWg-6k.uxwdjm4bSU7yBycbWuLzCg",
//         "ally-supports-cache": "{\"userAgent\":\"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/113.0\",\"version\":\"1.4.1\",\"focusAreaImgTabindex\":true,\"focusAreaTabindex\":true,\"focusAreaWithoutHref\":true,\"focusAudioWithoutControls\":false,\"focusBrokenImageMap\":true,\"focusChildrenOfFocusableFlexbox\":false,\"focusFieldsetDisabled\":false,\"focusFieldset\":false,\"focusFlexboxContainer\":false,\"focusFormDisabled\":true,\"focusImgIsmap\":false,\"focusImgUsemapTabindex\":false,\"focusInHiddenIframe\":false,\"focusInvalidTabindex\":false,\"focusLabelTabindex\":true,\"focusObjectSvg\":true,\"focusObjectSvgHidden\":false,\"focusRedirectImgUsemap\":false,\"focusRedirectLegend\":\"tabbable\",\"focusScrollBody\":false,\"focusScrollContainerWithoutOverflow\":false,\"focusScrollContainer\":false,\"focusSummary\":true,\"focusSvgFocusableAttribute\":false,\"focusSvgTabindexAttribute\":true,\"focusSvgNegativeTabindexAttribute\":true,\"focusSvgUseTabindex\":true,\"focusSvgForeignobjectTabindex\":true,\"focusSvg\":false,\"focusTabindexTrailingCharacters\":true,\"focusTable\":false,\"focusVideoWithoutControls\":true,\"cssShadowPiercingDeepCombinator\":\"\",\"focusInZeroDimensionObject\":true,\"focusObjectSwf\":true,\"focusSvgInIframe\":true,\"tabsequenceAreaAtImgPosition\":true,\"time\":\"2023-06-25T02:00:31.854Z\"}",
//         "CognitoIdentityServiceProvider.6lci33tvfndh322c9o1j4p3od7.319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9.clockDrift": "0",
//         "CognitoIdentityServiceProvider.6lci33tvfndh322c9o1j4p3od7.319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9.userData": "{\"UserAttributes\":[{\"Name\":\"sub\",\"Value\":\"319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9\"},{\"Name\":\"email_verified\",\"Value\":\"true\"},{\"Name\":\"email\",\"Value\":\"samuel.arant10@gmail.com\"}],\"Username\":\"319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9\"}",
//         "accessToken": "eyJraWQiOiJVNHVKRVRPOHg4YUxcL0crdGFkd3lEa1pQZCs1MGgxdTRxR3JKS2ZlNnA5MD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzMTljMGUyYy0xZTI1LTQ1ZTUtYjNmNC03YWMwNmE4ZTc1YTkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9BeHRNczRIbnUiLCJjbGllbnRfaWQiOiI2bGNpMzN0dmZuZGgzMjJjOW8xajRwM29kNyIsIm9yaWdpbl9qdGkiOiJmZGQ0Y2NlYy0zNGQ2LTQxZWQtOTcxYy0zZDExZWM3ZThhNDQiLCJldmVudF9pZCI6ImZmOTEzZjFlLThhZWItNDRjZS04OWY2LTU0ZDI2ZGE0NjljNyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODc3MDQ2NDIsImV4cCI6MTY4NzcwODI0MiwiaWF0IjoxNjg3NzA0NjQyLCJqdGkiOiJkOGI1MzBmYS03NTc5LTQ4NGUtYWRhNy02MjkxMjJmZDYxZGIiLCJ1c2VybmFtZSI6IjMxOWMwZTJjLTFlMjUtNDVlNS1iM2Y0LTdhYzA2YThlNzVhOSJ9.HxRG1cWfrJViUF_u8GhyfbOCJVUXXHGZPTB_5MB8isNHXzWr4obs209vXEwpd65D3jtOOqiYossMuMmMDjLOhGS0LRjaRK_sk1gGbbWkdsvgd1wkehO2YN8MxApk6_IwUzwlvZYAPT-3pM2EiHMxsoifpX5qEsHqB0QMVOfNwrKMwH9lGajzinb7VcZPVtyLO9fkPL1dKuu0Vtx5lkkRK_03ZECx3v13A8kF9RwtUJBwYcE3xF0C89jwv9Da0Ro7Ez8ldoH89tUH-fvvh5Fzty9fgz_2-6p9yZQJQT2qJmEJgqN6sMF4ceT4jMomCRAEbvOTIoTAJrEibgZQ1vFcvw",
//         "CognitoIdentityServiceProvider.6lci33tvfndh322c9o1j4p3od7.319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9.accessToken": "eyJraWQiOiJVNHVKRVRPOHg4YUxcL0crdGFkd3lEa1pQZCs1MGgxdTRxR3JKS2ZlNnA5MD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzMTljMGUyYy0xZTI1LTQ1ZTUtYjNmNC03YWMwNmE4ZTc1YTkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9BeHRNczRIbnUiLCJjbGllbnRfaWQiOiI2bGNpMzN0dmZuZGgzMjJjOW8xajRwM29kNyIsIm9yaWdpbl9qdGkiOiJmZGQ0Y2NlYy0zNGQ2LTQxZWQtOTcxYy0zZDExZWM3ZThhNDQiLCJldmVudF9pZCI6ImZmOTEzZjFlLThhZWItNDRjZS04OWY2LTU0ZDI2ZGE0NjljNyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODc3MDQ2NDIsImV4cCI6MTY4NzcwODI0MiwiaWF0IjoxNjg3NzA0NjQyLCJqdGkiOiJkOGI1MzBmYS03NTc5LTQ4NGUtYWRhNy02MjkxMjJmZDYxZGIiLCJ1c2VybmFtZSI6IjMxOWMwZTJjLTFlMjUtNDVlNS1iM2Y0LTdhYzA2YThlNzVhOSJ9.HxRG1cWfrJViUF_u8GhyfbOCJVUXXHGZPTB_5MB8isNHXzWr4obs209vXEwpd65D3jtOOqiYossMuMmMDjLOhGS0LRjaRK_sk1gGbbWkdsvgd1wkehO2YN8MxApk6_IwUzwlvZYAPT-3pM2EiHMxsoifpX5qEsHqB0QMVOfNwrKMwH9lGajzinb7VcZPVtyLO9fkPL1dKuu0Vtx5lkkRK_03ZECx3v13A8kF9RwtUJBwYcE3xF0C89jwv9Da0Ro7Ez8ldoH89tUH-fvvh5Fzty9fgz_2-6p9yZQJQT2qJmEJgqN6sMF4ceT4jMomCRAEbvOTIoTAJrEibgZQ1vFcvw",
//         "CognitoIdentityServiceProvider.6lci33tvfndh322c9o1j4p3od7.LastAuthUser": "319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9",
//         "chakra-ui-color-mode": "light",
//         "CognitoIdentityServiceProvider.6lci33tvfndh322c9o1j4p3od7.319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9.idToken": "eyJraWQiOiJVblRcL2VaWmdUQjdteVJScUVLalE2aDgyb0JPd3NZWlBBUFwvZ1wvdnhZRjdVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTljMGUyYy0xZTI1LTQ1ZTUtYjNmNC03YWMwNmE4ZTc1YTkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfQXh0TXM0SG51IiwiY29nbml0bzp1c2VybmFtZSI6IjMxOWMwZTJjLTFlMjUtNDVlNS1iM2Y0LTdhYzA2YThlNzVhOSIsIm9yaWdpbl9qdGkiOiJmZGQ0Y2NlYy0zNGQ2LTQxZWQtOTcxYy0zZDExZWM3ZThhNDQiLCJhdWQiOiI2bGNpMzN0dmZuZGgzMjJjOW8xajRwM29kNyIsImV2ZW50X2lkIjoiZmY5MTNmMWUtOGFlYi00NGNlLTg5ZjYtNTRkMjZkYTQ2OWM3IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2ODc3MDQ2NDIsImV4cCI6MTY4NzcwODI0MiwiaWF0IjoxNjg3NzA0NjQyLCJqdGkiOiJiMDlmZGZhNS04NmVhLTQ5YzEtODdmMC0xYTU4MDM2NWY1NjkiLCJlbWFpbCI6InNhbXVlbC5hcmFudDEwQGdtYWlsLmNvbSJ9.pC3643dnPhzBf330QADF9saKpmZg5VdtgBrAJc1N3uJfgCkBCsJqDzvHfFuMDgZOCZG0ZN1A67acsPPwe0ubVy7b79ETCSdD1MPE7hSbYns3cyb5Ez25I3oa6j6J8mzp0CRK1uS8lc9vF6k7HugdShQd-PP06yaR0mutFF-MgY9IN0Ac2YlmenM7SIXJEbS2LldYMa9bq995JXegZTpFjRvVbvUR_xqUvRxV_VEgn-M2XT5T7AoTNjUY9OqJIAGorvYWu4WTZQANo5Tvs0jyxgEDoQNGo46rFmHm6aadX_ELJd-UQH3XnR-Di-EufXSP1fQTuK1zIVMxkTuH5rpffw"
//       }
//     },
//     "Session": null,
//     "client": {
//       "endpoint": "https://cognito-idp.us-east-1.amazonaws.com/",
//       "fetchOptions": {}
//     },
//     "signInUserSession": {
//       "idToken": {
//         "jwtToken": "eyJraWQiOiJVblRcL2VaWmdUQjdteVJScUVLalE2aDgyb0JPd3NZWlBBUFwvZ1wvdnhZRjdVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTljMGUyYy0xZTI1LTQ1ZTUtYjNmNC03YWMwNmE4ZTc1YTkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfQXh0TXM0SG51IiwiY29nbml0bzp1c2VybmFtZSI6IjMxOWMwZTJjLTFlMjUtNDVlNS1iM2Y0LTdhYzA2YThlNzVhOSIsIm9yaWdpbl9qdGkiOiJmZGQ0Y2NlYy0zNGQ2LTQxZWQtOTcxYy0zZDExZWM3ZThhNDQiLCJhdWQiOiI2bGNpMzN0dmZuZGgzMjJjOW8xajRwM29kNyIsImV2ZW50X2lkIjoiZmY5MTNmMWUtOGFlYi00NGNlLTg5ZjYtNTRkMjZkYTQ2OWM3IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2ODc3MDQ2NDIsImV4cCI6MTY4NzcwODI0MiwiaWF0IjoxNjg3NzA0NjQyLCJqdGkiOiJiMDlmZGZhNS04NmVhLTQ5YzEtODdmMC0xYTU4MDM2NWY1NjkiLCJlbWFpbCI6InNhbXVlbC5hcmFudDEwQGdtYWlsLmNvbSJ9.pC3643dnPhzBf330QADF9saKpmZg5VdtgBrAJc1N3uJfgCkBCsJqDzvHfFuMDgZOCZG0ZN1A67acsPPwe0ubVy7b79ETCSdD1MPE7hSbYns3cyb5Ez25I3oa6j6J8mzp0CRK1uS8lc9vF6k7HugdShQd-PP06yaR0mutFF-MgY9IN0Ac2YlmenM7SIXJEbS2LldYMa9bq995JXegZTpFjRvVbvUR_xqUvRxV_VEgn-M2XT5T7AoTNjUY9OqJIAGorvYWu4WTZQANo5Tvs0jyxgEDoQNGo46rFmHm6aadX_ELJd-UQH3XnR-Di-EufXSP1fQTuK1zIVMxkTuH5rpffw",
//         "payload": {
//           "sub": "319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9",
//           "email_verified": true,
//           "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_AxtMs4Hnu",
//           "cognito:username": "319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9",
//           "origin_jti": "fdd4ccec-34d6-41ed-971c-3d11ec7e8a44",
//           "aud": "6lci33tvfndh322c9o1j4p3od7",
//           "event_id": "ff913f1e-8aeb-44ce-89f6-54d26da469c7",
//           "token_use": "id",
//           "auth_time": 1687704642,
//           "exp": 1687708242,
//           "iat": 1687704642,
//           "jti": "b09fdfa5-86ea-49c1-87f0-1a580365f569",
//           "email": "samuel.arant10@gmail.com"
//         }
//       },
//       "refreshToken": {
//         "token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.lx88ezTuzJbRYk5grB_ZxT-9QK2chCixuFv5myDIZeotg98Pe0UnXpU3xn0oSr7hKv-BPPibKA-ou6YJQQgJG2n-y5Vj8OoX5DuRPwxx7zSc2ZXrdzI4t3U7JTTYo2T7Qt6yn2V6S0rShyLLo5QfQWjeH45KIMPqSSp3Hp-klQrMuLwb-AtSmvkxBKkkKAt6_20yHOaDNlE7YYR5Fz1d-Qtrpd7JMghsSQhRaRkYOwrrXxADc8G4VevIeuMqJdHkWbnabGtfXMX_7M-N5mr2MIv2PZqlSkTrpTLi26RmQgGX_JtRsSFn3NWYy0MuqAxl4wUp0NYfRFZB_feUQoskMQ.-K2UYBCnaOJI-tBA.7wHeBX0e4IBXGd59nMDSpatTIBVUVE-kkCuPX9i7oEbyFwdYTJkA4LPv0qXFbZlQLtlGNH3CdGgJ5ENH_8OPDTTRQ7KDYK9dxvGYK56V_ESYAX-yvixtItlJ7MYnD4UKNu-S2At-Qxq9iBowV9x4alQD4CfKoxNUkuhZVd2txYZjJf55z_S5KHdhFg0iOeAOZSWFYnXeixjhMVG21bjqN4CjFF69F7OgpQ0cw9YNV_fdNTOa69O5FreWUSkiXiJ1mklIha3AqX6bQqjplAxOPY4Km5xOaF9xojwY8DtSPu_YiC0XwXUeIwd9JUQ06POE7HiF-l5hNmA0kOen_sdUMK2WDi_CrDWEXyP3W0gNP-ftjrB6AZ1_9yB-xWwqjxjflme6G_AesXHGusH-9jOjXN3mRttrXXCkQBtRwenacnhGqfwO4syJKGDKj0boCZgR-KQpcvMgF9kYP7zysgI8bCI1Usc3GnTAH3opm_fyVmgvQZjr6h9zhwJVMpmbISm2Os7XZYib-M_ac7670xu11pTUiXg-Wz3KriHaRI9f8pFv1MKAzghtjZf6QSyg_q0wDDZkRGKJYE3vX6UKpCa-ueS65P1vObIQCix-T9spvrkZU94Ndfr33PjF2AoFfp7I94l2aTNo64cdeoBR94D6WlmppuD9iMktYuDrGSsZdv981yjulvCeeBrRe0f_gvf5A0AiQwAWs7ozUb7x9Hki3oLacaAEbA1GZq8ke04MAVhCRf1D7pxbLGIJ48GeuTygZWpdb56fu-o9IUlm5YUQEnl5ZObfE76YkIv5PO3JdWChdu2vndOS1UzgJh4Pacue17ma8qC3r5Lub8Bru4g0WEu0sPP2SdTu4lWc7uKRim1PvBMMpyEY7alcYPdbfS3isDxnHfxuWe9v9Xbb5ileX6mLx5Xmxga4FqaYvaehhIWyoMLKvJfPMOsd_0SvhKF2j-80v6HolKdf-vQ3P5XhLPqudhn2v6ze0CiAxk4lLITpYPA4Tqg2PzkhypSl_IRyCTSDR5g8a0mtQx_N5jyl-Go9TksH9pKRcr-UgZuDDs2CNl8cXlTdRZ5ZUDYKXfVhxWgM7fF0BbDb9S87P-t1XYbt8dx5IfGiAFAtLXkDtsmVxUpmFp0PByOI_rfm7O8w74V8_ZHmY4eLvYvjs6e5q2F815TdcfeKrhQbGEF10ucktw8VVsm_az4x6jZKQeX_KyjvazHyRLZf8wxu_Uhce7IxVThzpz8HVQ5j53WccoQsaCrmyKdwkO9s4rOk9MCrGMgNJhHBYpeYekB2088WrvYxN0F9-FETAMoOZbw6nquMoqrB2JhsLtWg-6k.uxwdjm4bSU7yBycbWuLzCg"
//       },
//       "accessToken": {
//         "jwtToken": "eyJraWQiOiJVNHVKRVRPOHg4YUxcL0crdGFkd3lEa1pQZCs1MGgxdTRxR3JKS2ZlNnA5MD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzMTljMGUyYy0xZTI1LTQ1ZTUtYjNmNC03YWMwNmE4ZTc1YTkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9BeHRNczRIbnUiLCJjbGllbnRfaWQiOiI2bGNpMzN0dmZuZGgzMjJjOW8xajRwM29kNyIsIm9yaWdpbl9qdGkiOiJmZGQ0Y2NlYy0zNGQ2LTQxZWQtOTcxYy0zZDExZWM3ZThhNDQiLCJldmVudF9pZCI6ImZmOTEzZjFlLThhZWItNDRjZS04OWY2LTU0ZDI2ZGE0NjljNyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODc3MDQ2NDIsImV4cCI6MTY4NzcwODI0MiwiaWF0IjoxNjg3NzA0NjQyLCJqdGkiOiJkOGI1MzBmYS03NTc5LTQ4NGUtYWRhNy02MjkxMjJmZDYxZGIiLCJ1c2VybmFtZSI6IjMxOWMwZTJjLTFlMjUtNDVlNS1iM2Y0LTdhYzA2YThlNzVhOSJ9.HxRG1cWfrJViUF_u8GhyfbOCJVUXXHGZPTB_5MB8isNHXzWr4obs209vXEwpd65D3jtOOqiYossMuMmMDjLOhGS0LRjaRK_sk1gGbbWkdsvgd1wkehO2YN8MxApk6_IwUzwlvZYAPT-3pM2EiHMxsoifpX5qEsHqB0QMVOfNwrKMwH9lGajzinb7VcZPVtyLO9fkPL1dKuu0Vtx5lkkRK_03ZECx3v13A8kF9RwtUJBwYcE3xF0C89jwv9Da0Ro7Ez8ldoH89tUH-fvvh5Fzty9fgz_2-6p9yZQJQT2qJmEJgqN6sMF4ceT4jMomCRAEbvOTIoTAJrEibgZQ1vFcvw",
//         "payload": {
//           "sub": "319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9",
//           "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_AxtMs4Hnu",
//           "client_id": "6lci33tvfndh322c9o1j4p3od7",
//           "origin_jti": "fdd4ccec-34d6-41ed-971c-3d11ec7e8a44",
//           "event_id": "ff913f1e-8aeb-44ce-89f6-54d26da469c7",
//           "token_use": "access",
//           "scope": "aws.cognito.signin.user.admin",
//           "auth_time": 1687704642,
//           "exp": 1687708242,
//           "iat": 1687704642,
//           "jti": "d8b530fa-7579-484e-ada7-629122fd61db",
//           "username": "319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9"
//         }
//       },
//       "clockDrift": 0
//     },
//     "authenticationFlowType": "USER_SRP_AUTH",
//     "storage": {
//       "amplify-signin-with-hostedUI": "false",
//       "CognitoIdentityServiceProvider.6lci33tvfndh322c9o1j4p3od7.319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9.refreshToken": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.lx88ezTuzJbRYk5grB_ZxT-9QK2chCixuFv5myDIZeotg98Pe0UnXpU3xn0oSr7hKv-BPPibKA-ou6YJQQgJG2n-y5Vj8OoX5DuRPwxx7zSc2ZXrdzI4t3U7JTTYo2T7Qt6yn2V6S0rShyLLo5QfQWjeH45KIMPqSSp3Hp-klQrMuLwb-AtSmvkxBKkkKAt6_20yHOaDNlE7YYR5Fz1d-Qtrpd7JMghsSQhRaRkYOwrrXxADc8G4VevIeuMqJdHkWbnabGtfXMX_7M-N5mr2MIv2PZqlSkTrpTLi26RmQgGX_JtRsSFn3NWYy0MuqAxl4wUp0NYfRFZB_feUQoskMQ.-K2UYBCnaOJI-tBA.7wHeBX0e4IBXGd59nMDSpatTIBVUVE-kkCuPX9i7oEbyFwdYTJkA4LPv0qXFbZlQLtlGNH3CdGgJ5ENH_8OPDTTRQ7KDYK9dxvGYK56V_ESYAX-yvixtItlJ7MYnD4UKNu-S2At-Qxq9iBowV9x4alQD4CfKoxNUkuhZVd2txYZjJf55z_S5KHdhFg0iOeAOZSWFYnXeixjhMVG21bjqN4CjFF69F7OgpQ0cw9YNV_fdNTOa69O5FreWUSkiXiJ1mklIha3AqX6bQqjplAxOPY4Km5xOaF9xojwY8DtSPu_YiC0XwXUeIwd9JUQ06POE7HiF-l5hNmA0kOen_sdUMK2WDi_CrDWEXyP3W0gNP-ftjrB6AZ1_9yB-xWwqjxjflme6G_AesXHGusH-9jOjXN3mRttrXXCkQBtRwenacnhGqfwO4syJKGDKj0boCZgR-KQpcvMgF9kYP7zysgI8bCI1Usc3GnTAH3opm_fyVmgvQZjr6h9zhwJVMpmbISm2Os7XZYib-M_ac7670xu11pTUiXg-Wz3KriHaRI9f8pFv1MKAzghtjZf6QSyg_q0wDDZkRGKJYE3vX6UKpCa-ueS65P1vObIQCix-T9spvrkZU94Ndfr33PjF2AoFfp7I94l2aTNo64cdeoBR94D6WlmppuD9iMktYuDrGSsZdv981yjulvCeeBrRe0f_gvf5A0AiQwAWs7ozUb7x9Hki3oLacaAEbA1GZq8ke04MAVhCRf1D7pxbLGIJ48GeuTygZWpdb56fu-o9IUlm5YUQEnl5ZObfE76YkIv5PO3JdWChdu2vndOS1UzgJh4Pacue17ma8qC3r5Lub8Bru4g0WEu0sPP2SdTu4lWc7uKRim1PvBMMpyEY7alcYPdbfS3isDxnHfxuWe9v9Xbb5ileX6mLx5Xmxga4FqaYvaehhIWyoMLKvJfPMOsd_0SvhKF2j-80v6HolKdf-vQ3P5XhLPqudhn2v6ze0CiAxk4lLITpYPA4Tqg2PzkhypSl_IRyCTSDR5g8a0mtQx_N5jyl-Go9TksH9pKRcr-UgZuDDs2CNl8cXlTdRZ5ZUDYKXfVhxWgM7fF0BbDb9S87P-t1XYbt8dx5IfGiAFAtLXkDtsmVxUpmFp0PByOI_rfm7O8w74V8_ZHmY4eLvYvjs6e5q2F815TdcfeKrhQbGEF10ucktw8VVsm_az4x6jZKQeX_KyjvazHyRLZf8wxu_Uhce7IxVThzpz8HVQ5j53WccoQsaCrmyKdwkO9s4rOk9MCrGMgNJhHBYpeYekB2088WrvYxN0F9-FETAMoOZbw6nquMoqrB2JhsLtWg-6k.uxwdjm4bSU7yBycbWuLzCg",
//       "ally-supports-cache": "{\"userAgent\":\"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/113.0\",\"version\":\"1.4.1\",\"focusAreaImgTabindex\":true,\"focusAreaTabindex\":true,\"focusAreaWithoutHref\":true,\"focusAudioWithoutControls\":false,\"focusBrokenImageMap\":true,\"focusChildrenOfFocusableFlexbox\":false,\"focusFieldsetDisabled\":false,\"focusFieldset\":false,\"focusFlexboxContainer\":false,\"focusFormDisabled\":true,\"focusImgIsmap\":false,\"focusImgUsemapTabindex\":false,\"focusInHiddenIframe\":false,\"focusInvalidTabindex\":false,\"focusLabelTabindex\":true,\"focusObjectSvg\":true,\"focusObjectSvgHidden\":false,\"focusRedirectImgUsemap\":false,\"focusRedirectLegend\":\"tabbable\",\"focusScrollBody\":false,\"focusScrollContainerWithoutOverflow\":false,\"focusScrollContainer\":false,\"focusSummary\":true,\"focusSvgFocusableAttribute\":false,\"focusSvgTabindexAttribute\":true,\"focusSvgNegativeTabindexAttribute\":true,\"focusSvgUseTabindex\":true,\"focusSvgForeignobjectTabindex\":true,\"focusSvg\":false,\"focusTabindexTrailingCharacters\":true,\"focusTable\":false,\"focusVideoWithoutControls\":true,\"cssShadowPiercingDeepCombinator\":\"\",\"focusInZeroDimensionObject\":true,\"focusObjectSwf\":true,\"focusSvgInIframe\":true,\"tabsequenceAreaAtImgPosition\":true,\"time\":\"2023-06-25T02:00:31.854Z\"}",
//       "CognitoIdentityServiceProvider.6lci33tvfndh322c9o1j4p3od7.319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9.clockDrift": "0",
//       "CognitoIdentityServiceProvider.6lci33tvfndh322c9o1j4p3od7.319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9.userData": "{\"UserAttributes\":[{\"Name\":\"sub\",\"Value\":\"319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9\"},{\"Name\":\"email_verified\",\"Value\":\"true\"},{\"Name\":\"email\",\"Value\":\"samuel.arant10@gmail.com\"}],\"Username\":\"319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9\"}",
//       "accessToken": "eyJraWQiOiJVNHVKRVRPOHg4YUxcL0crdGFkd3lEa1pQZCs1MGgxdTRxR3JKS2ZlNnA5MD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzMTljMGUyYy0xZTI1LTQ1ZTUtYjNmNC03YWMwNmE4ZTc1YTkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9BeHRNczRIbnUiLCJjbGllbnRfaWQiOiI2bGNpMzN0dmZuZGgzMjJjOW8xajRwM29kNyIsIm9yaWdpbl9qdGkiOiJmZGQ0Y2NlYy0zNGQ2LTQxZWQtOTcxYy0zZDExZWM3ZThhNDQiLCJldmVudF9pZCI6ImZmOTEzZjFlLThhZWItNDRjZS04OWY2LTU0ZDI2ZGE0NjljNyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODc3MDQ2NDIsImV4cCI6MTY4NzcwODI0MiwiaWF0IjoxNjg3NzA0NjQyLCJqdGkiOiJkOGI1MzBmYS03NTc5LTQ4NGUtYWRhNy02MjkxMjJmZDYxZGIiLCJ1c2VybmFtZSI6IjMxOWMwZTJjLTFlMjUtNDVlNS1iM2Y0LTdhYzA2YThlNzVhOSJ9.HxRG1cWfrJViUF_u8GhyfbOCJVUXXHGZPTB_5MB8isNHXzWr4obs209vXEwpd65D3jtOOqiYossMuMmMDjLOhGS0LRjaRK_sk1gGbbWkdsvgd1wkehO2YN8MxApk6_IwUzwlvZYAPT-3pM2EiHMxsoifpX5qEsHqB0QMVOfNwrKMwH9lGajzinb7VcZPVtyLO9fkPL1dKuu0Vtx5lkkRK_03ZECx3v13A8kF9RwtUJBwYcE3xF0C89jwv9Da0Ro7Ez8ldoH89tUH-fvvh5Fzty9fgz_2-6p9yZQJQT2qJmEJgqN6sMF4ceT4jMomCRAEbvOTIoTAJrEibgZQ1vFcvw",
//       "CognitoIdentityServiceProvider.6lci33tvfndh322c9o1j4p3od7.319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9.accessToken": "eyJraWQiOiJVNHVKRVRPOHg4YUxcL0crdGFkd3lEa1pQZCs1MGgxdTRxR3JKS2ZlNnA5MD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzMTljMGUyYy0xZTI1LTQ1ZTUtYjNmNC03YWMwNmE4ZTc1YTkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9BeHRNczRIbnUiLCJjbGllbnRfaWQiOiI2bGNpMzN0dmZuZGgzMjJjOW8xajRwM29kNyIsIm9yaWdpbl9qdGkiOiJmZGQ0Y2NlYy0zNGQ2LTQxZWQtOTcxYy0zZDExZWM3ZThhNDQiLCJldmVudF9pZCI6ImZmOTEzZjFlLThhZWItNDRjZS04OWY2LTU0ZDI2ZGE0NjljNyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODc3MDQ2NDIsImV4cCI6MTY4NzcwODI0MiwiaWF0IjoxNjg3NzA0NjQyLCJqdGkiOiJkOGI1MzBmYS03NTc5LTQ4NGUtYWRhNy02MjkxMjJmZDYxZGIiLCJ1c2VybmFtZSI6IjMxOWMwZTJjLTFlMjUtNDVlNS1iM2Y0LTdhYzA2YThlNzVhOSJ9.HxRG1cWfrJViUF_u8GhyfbOCJVUXXHGZPTB_5MB8isNHXzWr4obs209vXEwpd65D3jtOOqiYossMuMmMDjLOhGS0LRjaRK_sk1gGbbWkdsvgd1wkehO2YN8MxApk6_IwUzwlvZYAPT-3pM2EiHMxsoifpX5qEsHqB0QMVOfNwrKMwH9lGajzinb7VcZPVtyLO9fkPL1dKuu0Vtx5lkkRK_03ZECx3v13A8kF9RwtUJBwYcE3xF0C89jwv9Da0Ro7Ez8ldoH89tUH-fvvh5Fzty9fgz_2-6p9yZQJQT2qJmEJgqN6sMF4ceT4jMomCRAEbvOTIoTAJrEibgZQ1vFcvw",
//       "CognitoIdentityServiceProvider.6lci33tvfndh322c9o1j4p3od7.LastAuthUser": "319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9",
//       "chakra-ui-color-mode": "light",
//       "CognitoIdentityServiceProvider.6lci33tvfndh322c9o1j4p3od7.319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9.idToken": "eyJraWQiOiJVblRcL2VaWmdUQjdteVJScUVLalE2aDgyb0JPd3NZWlBBUFwvZ1wvdnhZRjdVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTljMGUyYy0xZTI1LTQ1ZTUtYjNmNC03YWMwNmE4ZTc1YTkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfQXh0TXM0SG51IiwiY29nbml0bzp1c2VybmFtZSI6IjMxOWMwZTJjLTFlMjUtNDVlNS1iM2Y0LTdhYzA2YThlNzVhOSIsIm9yaWdpbl9qdGkiOiJmZGQ0Y2NlYy0zNGQ2LTQxZWQtOTcxYy0zZDExZWM3ZThhNDQiLCJhdWQiOiI2bGNpMzN0dmZuZGgzMjJjOW8xajRwM29kNyIsImV2ZW50X2lkIjoiZmY5MTNmMWUtOGFlYi00NGNlLTg5ZjYtNTRkMjZkYTQ2OWM3IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2ODc3MDQ2NDIsImV4cCI6MTY4NzcwODI0MiwiaWF0IjoxNjg3NzA0NjQyLCJqdGkiOiJiMDlmZGZhNS04NmVhLTQ5YzEtODdmMC0xYTU4MDM2NWY1NjkiLCJlbWFpbCI6InNhbXVlbC5hcmFudDEwQGdtYWlsLmNvbSJ9.pC3643dnPhzBf330QADF9saKpmZg5VdtgBrAJc1N3uJfgCkBCsJqDzvHfFuMDgZOCZG0ZN1A67acsPPwe0ubVy7b79ETCSdD1MPE7hSbYns3cyb5Ez25I3oa6j6J8mzp0CRK1uS8lc9vF6k7HugdShQd-PP06yaR0mutFF-MgY9IN0Ac2YlmenM7SIXJEbS2LldYMa9bq995JXegZTpFjRvVbvUR_xqUvRxV_VEgn-M2XT5T7AoTNjUY9OqJIAGorvYWu4WTZQANo5Tvs0jyxgEDoQNGo46rFmHm6aadX_ELJd-UQH3XnR-Di-EufXSP1fQTuK1zIVMxkTuH5rpffw"
//     },
//     "keyPrefix": "CognitoIdentityServiceProvider.6lci33tvfndh322c9o1j4p3od7",
//     "userDataKey": "CognitoIdentityServiceProvider.6lci33tvfndh322c9o1j4p3od7.319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9.userData",
//     "attributes": {
//       "sub": "319c0e2c-1e25-45e5-b3f4-7ac06a8e75a9",
//       "email_verified": true,
//       "email": "samuel.arant10@gmail.com"
//     },
//     "preferredMFA": "NOMFA"
//   }
