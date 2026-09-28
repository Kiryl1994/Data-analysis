let cities = [];
let person = [];
let specializations = [];

Promise.all ([
    fetch("cities.json"),
    fetch("person.json"),
    fetch("specializations.json")
])
    .then(async([citiesResponse, personResponse, specializationsResponse]) => {
    const citiesJson = await citiesResponse.json();
    const personJson = await personResponse.json();
    const specializationsJson = await specializationsResponse.json();
    return [citiesJson, personJson, specializationsJson];
}).then (response => {
    cities = response[0];
    person = response[1];
    specializations = response[2];


    person.forEach(user => { 
    const city = cities.find( 
        city => city.id === user.personal.locationId); 
        user.city = city.name; 
    });

    function getInfo() {
    return `${this.personal.firstName} ${this.personal.lastName}, ${this.city}`;
}



const designersWithFigma = person.filter(user => { 
    const specialization = specializations.find( 
        item => item.id === user.personal.specializationId);

    const hasFigma = user.skills.some( 
        skills => skills.name.toLowerCase() === 'figma');

    return specialization.name === 'designer' && hasFigma; 
});

console.log('2. Дизайнеры с Figma:'); 

designersWithFigma.forEach(user => { 
    console.log(getInfo.call(user)); 
});



const firstDeveloperWithReact = person.find(user => { 
    const specialization = specializations.find( 
        item => item.id === user.personal.specializationId);

    const hasReact = user.skills.some( 
        skill => skill.name.toLowerCase() === 'react');

    return ( specialization.name === 'frontend' && hasReact ); 
});

console.log('3. Первый frontend-разработчик с React:'); 
if (firstDeveloperWithReact) { 
    console.log(getInfo.call(firstDeveloperWithReact)); 
}




const allUsersAreAdults = person.every(user => { 
    const [day, month, year] = user.personal.birthday.split('.'); 
    
    const birthday = new Date(year, month - 1, day); 
    const today = new Date(); 

    let age = today.getFullYear() - birthday.getFullYear(); 
    
    const monthDifference = today.getMonth() - birthday.getMonth(); 
    if ( 
        monthDifference < 0 || 
        (monthDifference === 0 && 
            today.getDate() < birthday.getDate()) 
    ) { 
        age--; 
    } 
    
    return age >= 18; 
}); 

console.log('4. Все ли пользователи старше 18 лет:', allUsersAreAdults);





const backendFromMoscow = person.filter(user => {
    const specialization = specializations.find( 
        item => item.id === user.personal.specializationId); 
        
    const salary = user.request.find( 
        item => item.name === 'Зарплата'); 
        
    const employment = user.request.find( 
        item => item.name === 'Тип занятости'); 
        
    return ( 
        specialization.name === 'backend' && 
        user.city === 'Москва' && 
        employment.value === 'Полная'); 
    })
    .sort((a, b) => { 
        const salaryA = a.request.find( 
            item => item.name === 'Зарплата').value; 
            
        const salaryB = b.request.find( 
            item => item.name === 'Зарплата').value; 
            
        return salaryA - salaryB; 
    });

    console.log('5. Backend-разработчики из Москвы:'); 
    
    backendFromMoscow.forEach(user => { 
        console.log(getInfo.call(user)); 
        
        const salary = user.request.find( 
            item => item.name === 'Зарплата'); 
            
            console.log('Зарплата:', salary.value);     
    });





const designersWithPhotoshopAndFigma = person.filter(user => { 
    const specialization = specializations.find( 
        item => item.id === user.personal.specializationId); 
            
    if (specialization.name !== 'designer') { 
        return false; 
    } 
        
    const figma = user.skills.find( 
        skill => skill.name.toLowerCase() === 'figma');

    const photoshop = user.skills.find( 
        skill => skill.name.toLowerCase() === 'photoshop'); 
            
    return ( figma && photoshop && figma.level >= 6 && photoshop.level >= 6 ); 
});

console.log('6. Дизайнеры с Figma и Photoshop >= 6:'); 

designersWithPhotoshopAndFigma.forEach(user => { 
    console.log(getInfo.call(user)); 
});





const bestFigmaDesigner = person.filter(user => { 
    const specialization = specializations.find( 
        item => item.id === user.personal.specializationId); 
        
    return specialization.name === 'designer'; 
}) 
.sort((a, b) => { 
    const figmaA = a.skills.find( 
        skill => skill.name.toLowerCase() === 'figma'); 
        
    const figmaB = b.skills.find( 
        skill => skill.name.toLowerCase() === 'figma'); 
        
    return (figmaB?.level || 0) - (figmaA?.level || 0); 
})[0];


const bestAngularFrontend = person.filter(user => { 
    const specialization = specializations.find( 
        item => item.id === user.personal.specializationId); 
        return specialization.name === 'frontend'; 
    }) 
    .sort((a, b) => { 
        const angularA = a.skills.find( 
            skill => skill.name.toLowerCase() === 'angular'); 
            
        const angularB = b.skills.find( 
            skill => skill.name.toLowerCase() === 'angular'); 
            
    return (angularB?.level || 0) - (angularA?.level || 0); 
})[0];


const bestGoBackend = person.filter(user => { 
    const specialization = specializations.find( 
        item => item.id === user.personal.specializationId); 
        return specialization.name === 'backend'; 
    }) 
    .sort((a, b) => { 
        const goA = a.skills.find( 
            skill => skill.name.toLowerCase() === 'go'); 
            
        const goB = b.skills.find( 
            skill => skill.name.toLowerCase() === 'go'); 
            
    return (goB?.level || 0) - (goA?.level || 0); 
})[0];

console.log('7. Команда проекта:'); 

console.log('Дизайнер:', getInfo.call(bestFigmaDesigner)); 
console.log('Frontend:', getInfo.call(bestAngularFrontend)); 
console.log('Backend:', getInfo.call(bestGoBackend));



})




