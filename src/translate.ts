async function translate(english: string): Promise<string> {
    return Promise.resolve(english.toLocaleUpperCase());
}

export default translate;