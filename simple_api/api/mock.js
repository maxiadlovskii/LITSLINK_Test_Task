var costType = [
    {id: 1,
        name: 'Товари для тварин',
        icon: 'guidedog',
        income: false
    },
    {id: 2,
        name: 'Товари для здоровя',
        icon: 'medkit',
        income: false
    },
    {id: 3,
        name: 'Зарплата',
        icon: 'cc-visa',
        income: true
    }

]
var costs = [
    {
        id: 1,
        comment: 'Іграшка пищалка',
        type: 1,
        date: new Date(2018, 0, 1),
        sum: 200
    },
    {
        id: 2,
        comment: 'Премія',
        type: 3,
        date: new Date(2018, 0, 1),
        sum: 3000
    },
    {
        id: 3,
        comment: 'Премія 2',
        type: 3,
        date: new Date(2018, 2, 1),
        sum: 3000
    },
    {
        id: 4,
        comment: 'Іграшка антистрес',
        type: 2,
        date: new Date(2018, 3, 1),
        sum: 200
    },
    {
        id: 5,
        comment: 'Іграшка антистрес 2',
        type: 2,
        date: new Date(2018, 3, 11),
        sum: 200
    }
]
module.exports = {
    costType: costType,
    costs: costs
};