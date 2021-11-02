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
    return Api().get('issues.json', {
      headers: {
        'X-Redmine-API-Key': apiKey
      },
      params: {
        'issue_id': issueId
      }
    })
  },
  getProjects(apiKey, offset) {
    return Api().get('projects.json', {
      headers: {
        'X-Redmine-API-Key': apiKey
      },
      params: {
        'limit': 100,
        'offset': offset
      }
    })
  },
  getProjectQueries(apiKey, offset) {
    return Api().get('queries.json', {
      headers: {
        'X-Redmine-API-Key': apiKey
      },
      params: {
        'limit': 100,
        'offset': offset
      }
    })
  },
  getAllUpdatedIssuesIn2020(apiKey, offset) {
    return Api().get('issues.json', {
      headers: {
        'X-Redmine-API-Key': apiKey
      },
      params: {
        'updated_by': 'me',
        'updated_on' : '><2020-01-01|2020-12-31',
        'limit': 100,
        'offset': offset
      }
    })
  },
  getIssuesForProject(apiKey, queryId, projectId) {
    return Api().get('issues.json', {
      headers: {
        'X-Redmine-API-Key': apiKey
      },
      params: {
        'project_id' : projectId,
        'query_id' : queryId,
        'limit': 100
      }
    })
  },
  getAllTimeEntriesIn2020(apiKey, offset) {
    return Api().get('time_entries.json', {
      headers: {
        'X-Redmine-API-Key': apiKey
      },
      params: {
        'user_id' : 'me',
        'from' : '2020-01-01',
        'to' : '2020-12-31',
        'limit': 100,
        'offset': offset
      }
    })
  },
  updateIssueStatus(apiKey, issueId, statusId) {
    return Api().put('issues/${issueId}.json', {
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
