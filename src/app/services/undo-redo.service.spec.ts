import { TestBed } from '@angular/core/testing'
import { UndoRedoService } from './undo-redo.service'

describe('UndoRedoService', () => {
  let service: UndoRedoService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(UndoRedoService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })


  it('should return null when undo or redo is not possible', () => {
    const state1 = { data: 'state1' } as unknown as ImageData

    service.saveState(state1)

    expect(service.undo()).toBeNull()

    expect(service.redo()).toBeNull()
  })

  it('should save and retrieve states', () => {
    const state1 = { data: 'state1' } as unknown as ImageData
    const state2 = { data: 'state2' } as unknown as ImageData

    service.saveState(state1)
    expect(service.undo()).toEqual(null)

    service.saveState(state2)
    expect(service.undo()).toEqual(state1)
  })

  it('should clear redo states when saving a new state', () => {
    const state1 = { data: 'state1' } as unknown as ImageData
    const state2 = { data: 'state2' } as unknown as ImageData

    service.saveState(state1)
    service.saveState(state2)
    service.undo()

    expect(service.redo()).toEqual(state2)

    service.saveState(state2)
    expect(service.redo()).toBeNull()
  })
})
