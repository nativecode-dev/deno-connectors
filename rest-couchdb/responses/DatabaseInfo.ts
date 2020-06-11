export interface DatabaseInfo {
  cluster: {
    n: number
    q: number
    r: number
    w: number
  }
  compact_running: boolean
  db_name: string
  disk_format_version: number
  doc_count: number
  doc_del_count: number
  instance_start_time: string
  purge_seq: string
  sizes: {
    active: number
    external: number
    file: number
    update_seq: string
    props: {
      partitioned: boolean
    }
  }
}
