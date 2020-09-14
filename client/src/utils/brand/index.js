export const getBrandColour = (name) => {
    switch(name) {
        case '1st Formations':
            return '#FFB525';
            break;
        case 'Rapid Formations':
            return '#16AAE2';
            break;
        case 'Quality Company Formations':
            return '#448288';
            break;
        case 'Blue Square Offices':
            return '#006B9E';
            break;
        default:
            return 'red';
    }
}