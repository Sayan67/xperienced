import { faker } from "@faker-js/faker";

const logoUrls = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png',
    'https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png'
]

export function generateOffers(n: number) {
    let r = [];
    for (let i=0; i < n; ++i) {
        r.push({
            from: { name: 'Meta', logo: null }, //logoUrls[Math.round(Math.random() * logoUrls.length) - 1]},
            title: faker.lorem.sentence({min: 5, max: 10}),
            description: faker.lorem.lines({ min: 3, max: 10 }),
            is_remote: !Math.round(Math.random()),
            location: faker.location.streetAddress(),
            schedule: {
                start: Math.trunc(Math.random() * 24),
                end: Math.trunc(Math.random() * 24),
                is_negotiable: !Math.round(Math.random()),
                duration: 9,
                days_per_week: Math.round(Math.random() * 5),
            }
        });
    }
    return r;
}