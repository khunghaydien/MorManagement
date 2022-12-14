import ApiClientWithToken from '@/api/api'

export default {
  getBranchList() {
    return ApiClientWithToken.get('/master/branches')
  },
  getContractGroups() {
    return ApiClientWithToken.get('/master/contract-group')
  },
  getContractTypes() {
    return ApiClientWithToken.get('/master/contract-type')
  },
  getDivisions() {
    return ApiClientWithToken.get('/master/divisions')
  },
  getPriorities() {
    return ApiClientWithToken.get('/master/priorities')
  },
  getSkillSets() {
    return ApiClientWithToken.get('/master/skill-sets')
  },
  getStatus() {
    return ApiClientWithToken.get('/master/status')
  },
}
