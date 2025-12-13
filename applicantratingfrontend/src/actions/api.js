
import base from "./api/axios";


export default {
    Candidate(url = "Candidates/") {
        return {
            fetchAll: () => base.get(url),
            fetchById: id => base.get(url + id),
            create: record => base.post(url, record),
            update: (id, record) => base.put(url + id, record),
            delete: id => base.delete(url + id),
        };
    }
};
