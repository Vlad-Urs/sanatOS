package com.team16.sanatos.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "director_log")
public class DirectorLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "director_log_id")
    private Integer directorLogId;

    @Column(name = "director_id")
    private Integer directorId;

    @Column(name = "action_type")
    private String actionType;

    @Column(name = "action_timestamp")
    private Timestamp actionTimestamp;

    @Column(name = "details")
    private String details;

    // Constructors, getters, and setters as needed


    public Integer getDirectorLogId() {
        return directorLogId;
    }

    public void setDirectorLogId(Integer directorLogId) {
        this.directorLogId = directorLogId;
    }

    public Integer getDirectorId() {
        return directorId;
    }

    public void setDirectorId(Integer directorId) {
        this.directorId = directorId;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public Timestamp getActionTimestamp() {
        return actionTimestamp;
    }

    public void setActionTimestamp(Timestamp actionTimestamp) {
        this.actionTimestamp = actionTimestamp;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
