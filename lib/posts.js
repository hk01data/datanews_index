import fs from 'fs'
import path from 'path'
// import ret from '../public/data_source'
let res = fs.readFileSync(`public/list_ts.json`)
const ret = JSON.parse(res)["projects_and_tags"]
// import matter from 'gray-matter'

// const { Pool, Client } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: '------',
//   port: 5434,
// });



/*
const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}
*/

/*
export async function getSortedPostsData() {
  // Connect db
  const client = await pool.connect()
  // Run function
  const results = await pool.query('SELECT * FROM tbl_datasets LIMIT 10;')
  // Release db
  await client.end()
  await client.release()

  let data = JSON.stringify(results.rows);

  // fs.writeFileSync(`${postsDirectory}/results.json`, data);

  return results.rows.map((o, idx) => {
    return {
      id: idx,
      "title": o.ctitle,
      "doc_id": o.doc_id,
    }
  })
}
*/

export async function getSortedPostsData() {
  return ret.map((o, idx) => {
    return {
      id: '' + o.id,
      title: o.ctitle || o.name,
      doc_id: o.doc_id || o.id,
      ...o,
      publish_time: o.timestamp_str,
    }
  })
}

/**
 * Router Paths here
 * @returns {}
 */
export async function getAllPostIds() {
  return ret.map((o, idx) => {
    return {
      params: {
        id: `${o.id}`
      }
    }
  })
}

export async function getPostData(id) {
  // Combine the data with the id
  // const theId = parseInt(id, 10)
  // const thePost = ret[theId]
  let res0 = fs.readFileSync(`public/output/${'' + id}.json`, {encoding: 'utf-8'})
  const thePost = JSON.parse(res0)

  if ('-' === thePost.data_column_names) {
    return {
      id,
      title: thePost.ctitle,
      doc_id: thePost.doc_id,
      publish_time: thePost.publish_time,
      data: [],
      ...thePost
    }
  }

  let rows = []
  const dataset = JSON.parse(thePost.dataset)
  const data_column_names = JSON.parse(thePost.data_column_names)

  if (thePost.data_column_names !== undefined) {

    if (data_column_names.data !== undefined) {
      if (data_column_names.data.label !== undefined) {
        if (data_column_names.data.value !== undefined) {
          if (data_column_names.data.filter !== undefined) {
            rows.push([data_column_names.data.label, ...data_column_names.data.value, 'filter'])
            rows = [...rows, ...dataset.data.map(o => {
              return [o.label, ...o.value, o['filter']]
            })]
          } else {
            // Basic structure
            rows.push([data_column_names.data.label, ...data_column_names.data.value])
            rows = [...rows, ...dataset.data.map(o => {
              return [o.label, ...o.value]
            })]
          }
        } else if (data_column_names.data.values !== undefined) {
          rows.push([data_column_names.data.label, ...data_column_names.data.values])
          rows = [...rows, ...dataset.data.map(o => {
            return [o.label, ...o.values]
          })]
        }
      } else if (data_column_names.data.nest_columns) {
        // nest_columns
        rows.push([...data_column_names.data.nest_columns, ...data_column_names.data.size_columns])
        rows = [...rows, ...dataset.data.map(o => {
          return [...o.nest_columns, ...o.size_columns]
        })]
      }
    } else if (data_column_names.rows) {
      rows.push(data_column_names.rows.columns)
      rows = [...rows, ...dataset.rows.map(o => {
        return o.columns
      })]
    } else if (data_column_names.choropleth) {
      // choropleth
      rows.push([...Object.keys(data_column_names.choropleth)])
      rows = [...rows, ...dataset.choropleth.map(o => {
        return [o.name, o.value, o.geometry, o.metadata]
      })]
    }
  }

  return {
    id,
    title: thePost.ctitle,
    doc_id: thePost.doc_id,
    publish_time: thePost.publish_time,
    data: rows,
    ...thePost
  }
}
