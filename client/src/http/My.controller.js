import {$host} from "./index";


export const fetchCourses = async () => {
    const data = await $host.get('api/c/courses').then(response => {
        console.log(response.data)

    }).catch(error => {
        console.log(error);
    })
    
    return data
}