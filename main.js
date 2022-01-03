const fetch = require('fetch')

async function fetchPackage({name, reference}) {
    if(["/", "./", "../"].some(prefix => reference.startsWith(prefix))) return await fs.readFile(reference)
    if(semver.valid(reference)) {
        return await fetchPackage({name, reference: `https://registry.yarnpkg.com/${name}/-/${name}-${reference}.tgz`})
    }
    let response = await fetch(reference);
    if(!response.ok) throw new Error(`Couldn't fetch package "${reference}"`)
    return await response.arrayBuffer()
}

fetchPackage({name: process.argv.slice(2).join(' ').split('@')[0], reference: process.argv.slice(2).join(' ').split('@')[1]})