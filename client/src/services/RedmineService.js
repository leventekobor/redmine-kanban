import Api from '@/services/Api'

export default {
  getUser(apiKey) {
    return Api().get("users/current.json", {
      headers: {
        'X-Redmine-API-Key': apiKey
      }
    })
  },
  getIssues(apiKey, issueId) {
    return Api().get(`issues.json?issue_id=${issueId}`, {
      headers: {
        'X-Redmine-API-Key': apiKey
      }
    })
  },
  getProjects(apiKey, offset) {
    return Api().get(`projects.json?limit=100&offset=${offset}`, {
      headers: {
        'X-Redmine-API-Key': apiKey
      }
    })
  },
  getProjectQueries(apiKey, offset) {
    return Api().get(`queries.json?limit=100&offset=${offset}`, {
      headers: {
        'X-Redmine-API-Key': apiKey
      }
    })
  },
  getAllUpdatedIssuesIn2020(apiKey, offset) {
    return Api().get(`issues.json?updated_by=me&updated_on=><2020-01-01|2020-12-31&limit=100&status_id=*&offset=${offset}`, {
      headers: {
        'X-Redmine-API-Key': apiKey
      }
    })
  },
  getIssuesForProject(apiKey, queryId, projectId) {
    return Api().get(`issues.json?query_id=${queryId}&project_id=${projectId}&limit=100`, {
      headers: {
        'X-Redmine-API-Key': apiKey
      }
    })
  },
  getAllTimeEntriesIn2020(apiKey, offset) {
    return Api().get(`time_entries.json?user_id=me&limit=100&from=2020-01-01&to=2020-12-31&offset=${offset}`, {
      headers: {
        'X-Redmine-API-Key': apiKey
      }
    })
  },
  updateIssueStatus(apiKey, issueId, statusId) {
    return Api().put(`issues/${issueId}.json`, {
      "issue": {
        "status_id": statusId
      }
    },
    {
      headers: {
        'X-Redmine-API-Key': apiKey
      }
    })
  }
}
