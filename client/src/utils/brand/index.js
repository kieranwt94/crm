export const getBrandColour = (name) => {
    let colour;
    switch(name) {
        case '1st Formations':
            colour = '#FFB525';
            break;
        case 'Rapid Formations':
            colour = '#16AAE2';
            break;
        case 'Quality Company Formations':
            colour = '#448288';
            break;
        case 'Blue Square Offices':
            colour = '#006B9E';
            break;
        default:
            colour = 'red';
    }

    return colour;
}