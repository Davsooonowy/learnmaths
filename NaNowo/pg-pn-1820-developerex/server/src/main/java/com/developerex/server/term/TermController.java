package com.developerex.server.term;

import com.developerex.server.term.dto.TermDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/terms")
public class TermController {
    private final TermService termService;

    @GetMapping
    public ResponseEntity<List<TermDto>> getAllTerms() {
        List<TermDto> terms = termService.getAllTerms();
        return new ResponseEntity<>(terms, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TermDto> addTerm(@Valid @RequestBody TermDto termDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(termService.addTerm(termDto));
    }
}
