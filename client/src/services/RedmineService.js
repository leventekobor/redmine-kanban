import Api from '@/services/Api'

export default class RedmineService{
  static getUser(apiKey) {
    return Api().get("users/current.json", {
      headers: {
        'X-Redmine-API-Key': apiKey
      }
    })
  }
  static getIssues(apiKey, issueId) {
    return Api().get('issues.json', {
      headers: {
        'X-Redmine-API-Key': apiKey
      },
      params: {
        'issue_id': issueId
      }
    })
  }
  static getProjects(apiKey, offset) {
    return Api().get('projects.json', {
      headers: {
        'X-Redmine-API-Key': apiKey
      },
      params: {
        'limit': 100,
        'offset': offset
      }
    })
  }
  static getProjectQueries(apiKey, offset) {
    return Api().get('queries.json', {
      headers: {
        'X-Redmine-API-Key': apiKey
      },
      params: {
        'limit': 100,
        'offset': offset
      }
    })
  }
  static getAllUpdatedIssuesIn2020(apiKey, offset) {
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
  }
  static getIssuesForProject(apiKey, queryId, projectId) {
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
  }
  static getAllTimeEntriesIn2020(apiKey, offset) {
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
  }
  static getKanbanConfigTracker(apiKey) {
    return Api().get('trackers.json', {
      headers: {
        'X-Redmine-API-Key': apiKey
      }
    })
  }
  static async getKanbanConfig(apiKey, projectId) {
    return Api().get('issues.json', {
      headers: {
        'X-Redmine-API-Key': apiKey
      },
      params: {
        'project_id': projectId,
        'tracker_id': (await RedmineService.getKanbanConfigTracker(apiKey)).data.trackers.find(tracker => tracker.name === 'Kanban').id,
        'limit': 100
      }
    })
  }
  static async getKanbanConfigStatuses(apiKey) {
    return Api().get('issue_statuses.json', {
      headers: {
        'X-Redmine-API-Key': apiKey
      }
    })
  }
  static updateIssueStatus(apiKey, issueId, statusId) {
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
