export interface SessionWhastAppType {
    WABrowserId: string,
    WASecretBundle: string,
    WAToken1: string,
    WAToken2: string
}

export interface SessionWhastAppReqType {
    phone: string,
    idUser: string,
    session: string
}

export interface SessionWhatResGetType {
    sessionWhtas: {
        id: string,
        idClient: string,
        phone: string,
        created: string,
        session: string
    }
}