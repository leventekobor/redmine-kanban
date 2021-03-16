import Api from '@/services/Api'

export default {
  getUser(apiKey) {
    return Api().get("users/current.json", {
      headers: {
        'X-Redmine-API-Key': apiKey,
        "Target-URL": "https://redmine.tigra.hu/"
      }
    })
  },
  getIssues(apiKey, issueId) {
    //console.log(apiKey, issueId)
    return Api().get(`issues.json?issue_id=${issueId}`, {
      headers: {
        'X-Redmine-API-Key': apiKey,
        "Target-URL": "https://redmine.tigra.hu/"
      }
    })
  },
  getAllUpdatedIssuesIn2020(apiKey, offset) {
    return Api().get(`issues.json?updated_by=me&updated_on=><2020-01-01|2020-12-31&limit=100&status_id=*&offset=${offset}`, {
      headers: {
        'X-Redmine-API-Key': apiKey,
        "Target-URL": "https://redmine.tigra.hu/"
      }
    })
  },
  getAllTimeEntriesIn2020(apiKey, offset) {
    return Api().get(`time_entries.json?user_id=me&limit=100&from=2020-01-01&to=2020-12-31&offset=${offset}`, {
      headers: {
        'X-Redmine-API-Key': apiKey,
        "Target-URL": "https://redmine.tigra.hu/"
      }
    })
  }
}
