export function validateSequence(input) {
    const cleanSequence = input.toUpperCase().replace(/\s/g, '');
    const length = cleanSequence.length;
    
    const isValid = /^[ATGC]*$/.test(cleanSequence);
    const hasContent = length > 0;

    return {
        cleanSequence,
        length,
        isValid,
        hasContent,
        status: !hasContent ? 'empty' : (isValid ? 'valid' : 'invalid')
    };
}