export const Update = () => {
    const Theme = localStorage.getItem('theme') || 'dark'
    localStorage.setItem('theme', Theme)

    fetch('/api/util/themes')
        .then(res => res.json())
        .then(json => localStorage.setItem('theme-adv', JSON.stringify(json)))
}